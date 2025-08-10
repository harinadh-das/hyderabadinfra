package com.hyderabadinfra.fileupload.service;

import com.hyderabadinfra.fileupload.dto.FileUploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileUploadService {
    
    @Value("${file.upload.directory:./uploads}")
    private String uploadDirectory;
    
    @Value("${aws.s3.bucket-name:hyderabadinfra-files}")
    private String bucketName;
    
    @Value("${aws.s3.enabled:false}")
    private boolean s3Enabled;
    
    @Value("${aws.access-key-id:}")
    private String accessKeyId;
    
    @Value("${aws.secret-access-key:}")
    private String secretAccessKey;
    
    @Value("${aws.region:us-east-1}")
    private String region;
    
    private S3Client s3Client;
    
    public FileUploadResponse uploadFile(MultipartFile file, String userId) throws IOException {
        validateFile(file);
        
        String fileName = generateUniqueFileName(file.getOriginalFilename());
        String fileUrl;
        
        if (s3Enabled && isValidS3Config()) {
            fileUrl = uploadToS3(file, fileName, userId);
        } else {
            fileUrl = uploadToLocal(file, fileName, userId);
        }
        
        return new FileUploadResponse(fileName, fileUrl, file.getSize(), file.getContentType());
    }
    
    public List<FileUploadResponse> uploadMultipleFiles(List<MultipartFile> files, String userId) throws IOException {
        List<FileUploadResponse> responses = new ArrayList<>();
        
        for (MultipartFile file : files) {
            responses.add(uploadFile(file, userId));
        }
        
        return responses;
    }
    
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        
        if (file.getSize() > 10 * 1024 * 1024) { // 10MB limit
            throw new RuntimeException("File size exceeds limit of 10MB");
        }
        
        String contentType = file.getContentType();
        if (contentType == null || (!contentType.startsWith("image/") && !contentType.equals("application/pdf"))) {
            throw new RuntimeException("Only image files and PDF documents are allowed");
        }
    }
    
    private String generateUniqueFileName(String originalFilename) {
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return UUID.randomUUID().toString() + extension;
    }
    
    private String uploadToLocal(MultipartFile file, String fileName, String userId) throws IOException {
        // Create user-specific directory
        Path userDir = Paths.get(uploadDirectory, userId);
        Files.createDirectories(userDir);
        
        Path filePath = userDir.resolve(fileName);
        file.transferTo(filePath.toFile());
        
        return "/api/files/download/" + userId + "/" + fileName;
    }
    
    private String uploadToS3(MultipartFile file, String fileName, String userId) throws IOException {
        if (s3Client == null) {
            initS3Client();
        }
        
        String key = userId + "/" + fileName;
        
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .build();
        
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, key);
    }
    
    private void initS3Client() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }
    
    private boolean isValidS3Config() {
        return !accessKeyId.isEmpty() && !secretAccessKey.isEmpty();
    }
    
    public byte[] downloadFile(String userId, String fileName) throws IOException {
        if (s3Enabled && isValidS3Config()) {
            return downloadFromS3(userId, fileName);
        } else {
            return downloadFromLocal(userId, fileName);
        }
    }
    
    private byte[] downloadFromLocal(String userId, String fileName) throws IOException {
        Path filePath = Paths.get(uploadDirectory, userId, fileName);
        if (!Files.exists(filePath)) {
            throw new RuntimeException("File not found: " + fileName);
        }
        return Files.readAllBytes(filePath);
    }
    
    private byte[] downloadFromS3(String userId, String fileName) throws IOException {
        if (s3Client == null) {
            initS3Client();
        }
        
        String key = userId + "/" + fileName;
        return s3Client.getObjectAsBytes(builder -> builder.bucket(bucketName).key(key)).asByteArray();
    }
}