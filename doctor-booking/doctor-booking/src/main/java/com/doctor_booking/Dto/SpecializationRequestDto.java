package com.doctor_booking.Dto;

import jakarta.validation.constraints.NotBlank;

public record SpecializationRequestDto(@NotBlank
                                         String name) {
}
