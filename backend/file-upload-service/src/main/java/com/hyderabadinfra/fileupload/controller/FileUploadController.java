package com.hyderabadinfra.fileupload.controller;

import com.hyderabadinfra.common.dto.ApiResponse;
import com.hyderabadinfra.fileupload.dto.FileUploadResponse;
import com.hyderabadinfra.fileupload.service.FileUploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileUploadController {
    
    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
    
    @Autowired
    private FileUploadService fileUploadService;
    
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<FileUploadResponse>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-User-Id") String userId) {
        try {
            FileUploadResponse response = fileUploadService.uploadFile(file, userId);
            logger.info("File uploaded successfully: {} by user: {}", response.getFileName(), userId);
            return ResponseEntity.ok(ApiResponse.success("File uploaded successfully", response));
        } catch (Exception e) {
            logger.error("Failed to upload file for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("File upload failed", e.getMessage()));
        }
    }
    
    @PostMapping("/upload/multiple")
    public ResponseEntity<ApiResponse<List<FileUploadResponse>>> uploadMultipleFiles(
            @RequestParam("files") List<MultipartFile> files,
            @RequestHeader("X-User-Id") String userId) {
        try {
            List<FileUploadResponse> responses = fileUploadService.uploadMultipleFiles(files, userId);
            logger.info("Multiple files uploaded successfully: {} files by user: {}", responses.size(), userId);
            return ResponseEntity.ok(ApiResponse.success("Files uploaded successfully", responses));
        } catch (Exception e) {
            logger.error("Failed to upload multiple files for user: {} - {}", userId, e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("File upload failed", e.getMessage()));
        }
    }
    
    @GetMapping("/download/{userId}/{fileName}")
    public ResponseEntity<byte[]> downloadFile(
            @PathVariable String userId,
            @PathVariable String fileName) {
        try {
            byte[] fileContent = fileUploadService.downloadFile(userId, fileName);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);
            
            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Failed to download file: {} for user: {} - {}", fileName, userId, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}