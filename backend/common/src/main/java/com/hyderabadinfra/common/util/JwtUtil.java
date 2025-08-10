package com.hyderabadinfra.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret:hyderabadinfra-secret-key}")
    private String jwtSecret;
    
    @Value("${jwt.expiration:86400}")
    private int jwtExpirationInSeconds;
    
    @Value("${jwt.refresh.expiration:604800}")
    private int jwtRefreshExpirationInSeconds;
    
    public String generateAccessToken(String userId, String email, String role) {
        return JWT.create()
                .withSubject(userId)
                .withClaim("email", email)
                .withClaim("role", role)
                .withClaim("type", "access")
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationInSeconds * 1000L))
                .sign(Algorithm.HMAC256(jwtSecret));
    }
    
    public String generateRefreshToken(String userId) {
        return JWT.create()
                .withSubject(userId)
                .withClaim("type", "refresh")
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtRefreshExpirationInSeconds * 1000L))
                .sign(Algorithm.HMAC256(jwtSecret));
    }
    
    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret)).build();
            verifier.verify(token);
            return true;
        } catch (JWTVerificationException exception) {
            return false;
        }
    }
    
    public String getUserIdFromToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret)).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getSubject();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
    
    public String getEmailFromToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret)).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("email").asString();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
    
    public String getRoleFromToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret)).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("role").asString();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
    
    public String getTokenTypeFromToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret)).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("type").asString();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
    
    public boolean isTokenExpired(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret)).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getExpiresAt().before(new Date());
        } catch (JWTVerificationException exception) {
            return true;
        }
    }
}