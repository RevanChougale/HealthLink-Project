package com.doctor_booking.Dto;

import com.doctor_booking.Entity.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AppointmentResponseDto(Long id,
                                     Long doctorId,
                                     String doctorName,
                                     Long patientId,
                                     String patientName,
                                     Long timeSlotId,
                                     LocalDate appointmentDate,
                                     AppointmentStatus status,
                                     LocalDateTime createdAt) {
}
