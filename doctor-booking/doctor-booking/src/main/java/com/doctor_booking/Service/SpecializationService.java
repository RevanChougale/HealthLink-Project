package com.doctor_booking.Service;

import com.doctor_booking.Dto.SpecializationRequestDto;
import com.doctor_booking.Dto.SpecializationResponseDto;

import java.util.List;

public interface SpecializationService {
    SpecializationResponseDto createSpecialization(
            SpecializationRequestDto request);

    List<SpecializationResponseDto> getAllSpecializations();

    SpecializationResponseDto getSpecializationById(Long id);
}
