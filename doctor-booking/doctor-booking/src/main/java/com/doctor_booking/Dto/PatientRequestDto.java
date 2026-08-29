package com.doctor_booking.Dto;

import jakarta.validation.constraints.*;

public record PatientRequestDto(@NotBlank
                                String name,

                                @NotBlank
                                @Email
                                String email,

                                @NotBlank
                                String phone,

                                @NotNull
                                @Min(1)
                                @Max(120)
                                Integer age,

                                @NotBlank
                                String gender) {
}
