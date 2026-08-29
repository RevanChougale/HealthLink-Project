package com.doctor_booking.Dto;

public record PatientResponseDto(  Long id,
                                   String name,
                                   String email,
                                   String phone,
                                   Integer age,
                                   String gender) {
}
