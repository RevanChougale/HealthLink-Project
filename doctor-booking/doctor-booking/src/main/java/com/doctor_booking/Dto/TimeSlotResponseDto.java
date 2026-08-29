package com.doctor_booking.Dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record TimeSlotResponseDto(Long id,
                                  Long doctorId,
                                  LocalDate date,
                                  LocalTime startTime,
                                  LocalTime endTime,
                                  boolean available) {
}
