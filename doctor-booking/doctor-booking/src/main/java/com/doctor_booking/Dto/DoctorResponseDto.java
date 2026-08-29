package com.doctor_booking.Dto;

public record DoctorResponseDto( Long id,
                                 String name,
                                 String email,
                                 String phone,
                                 String city,
                                 String experience,
                                 String specialization) {
}
