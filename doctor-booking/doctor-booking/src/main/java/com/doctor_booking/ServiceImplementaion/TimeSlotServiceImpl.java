package com.doctor_booking.ServiceImplementaion;


import com.doctor_booking.Dto.TimeSlotRequestDto;
import com.doctor_booking.Dto.TimeSlotResponseDto;
import com.doctor_booking.Entity.Doctor;
import com.doctor_booking.Entity.TimeSlot;
import com.doctor_booking.Exception.ResourceNotFoundException;
import com.doctor_booking.Repository.DoctorRepository;
import com.doctor_booking.Repository.TimeSlotRepository;
import com.doctor_booking.Service.TimeSlotService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TimeSlotServiceImpl implements TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;
    private final DoctorRepository doctorRepository;

    public TimeSlotServiceImpl(TimeSlotRepository timeSlotRepository, DoctorRepository doctorRepository) {
        this.timeSlotRepository = timeSlotRepository;
        this.doctorRepository = doctorRepository;
    }


    @Override
    public TimeSlotResponseDto createTimeSlot(
            TimeSlotRequestDto request) {

        Doctor doctor = doctorRepository.findById(request.doctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: "
                                        + request.doctorId()));

        TimeSlot timeSlot = TimeSlot.builder()
                .doctor(doctor)
                .date(request.date())
                .startTime(request.startTime())
                .endTime(request.endTime())
                .available(true)
                .build();

        TimeSlot saved = timeSlotRepository.save(timeSlot);

        return mapToResponse(saved);
    }

    @Override
    public List<TimeSlotResponseDto> getAvailableSlots(
            Long doctorId,
            LocalDate date) {

        return timeSlotRepository
                .findByDoctorIdAndDateAndAvailableTrue(
                        doctorId,
                        date)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TimeSlotResponseDto mapToResponse(
            TimeSlot timeSlot) {

        return new TimeSlotResponseDto(
                timeSlot.getId(),
                timeSlot.getDoctor().getId(),
                timeSlot.getDate(),
                timeSlot.getStartTime(),
                timeSlot.getEndTime(),
                timeSlot.isAvailable()
        );
    }

    @Override
    public TimeSlotResponseDto getSlotById( Long id)
    { TimeSlot timeSlot = timeSlotRepository .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException( "Time slot not found with id: " + id));
        return mapToResponse(timeSlot);
    }

}
