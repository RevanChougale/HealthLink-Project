package com.doctor_booking.Service;

import com.doctor_booking.Dto.TimeSlotRequestDto;
import com.doctor_booking.Dto.TimeSlotResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface TimeSlotService {
    TimeSlotResponseDto createTimeSlot(TimeSlotRequestDto request);

    List<TimeSlotResponseDto> getAvailableSlots(
            Long doctorId,
            LocalDate date);

    TimeSlotResponseDto getSlotById( Long id);
}
