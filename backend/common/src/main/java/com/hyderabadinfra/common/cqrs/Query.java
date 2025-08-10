package com.hyderabadinfra.common.cqrs;

import java.time.Instant;
import java.util.UUID;

/**
 * Base interface for all queries in CQRS pattern
 */
public interface Query<T> {
    UUID getQueryId();
    String getUserId();
    Instant getTimestamp();
    String getQueryType();
    Class<T> getResponseType();
}