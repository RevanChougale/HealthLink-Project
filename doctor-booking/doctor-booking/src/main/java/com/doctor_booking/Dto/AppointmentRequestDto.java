package com.doctor_booking.Dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AppointmentRequestDto(@NotNull
                                     Long doctorId,

                                    @NotNull
                                     Long patientId,

                                    @NotNull
                                     Long timeSlotId,

                                    @NotNull
                                    LocalDate appointmentDate) {
}
