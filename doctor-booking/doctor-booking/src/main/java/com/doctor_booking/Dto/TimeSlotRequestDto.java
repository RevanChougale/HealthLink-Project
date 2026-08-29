package com.doctor_booking.Dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record TimeSlotRequestDto(@NotNull
                                   Long doctorId,

                                 @NotNull
                                 LocalDate date,

                                 @NotNull
                                 LocalTime startTime,

                                 @NotNull
                                   LocalTime endTime) {
}
