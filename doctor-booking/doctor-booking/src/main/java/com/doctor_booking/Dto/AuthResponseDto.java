package com.doctor_booking.Dto;

public record AuthResponseDto(String token,
                              String email,
                              String role,Long patientId) {
}
