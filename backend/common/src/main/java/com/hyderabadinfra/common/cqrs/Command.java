package com.hyderabadinfra.common.cqrs;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.time.Instant;
import java.util.UUID;

/**
 * Base interface for all commands in CQRS pattern
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "@type")
public interface Command {
    UUID getCommandId();
    String getUserId();
    Instant getTimestamp();
    String getCommandType();
}