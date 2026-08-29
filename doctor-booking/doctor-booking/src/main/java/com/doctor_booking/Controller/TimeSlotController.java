package com.doctor_booking.Controller;

import com.doctor_booking.Dto.TimeSlotRequestDto;
import com.doctor_booking.Dto.TimeSlotResponseDto;
import com.doctor_booking.Service.TimeSlotService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class TimeSlotController {


    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TimeSlotResponseDto createSlot(
            @Valid @RequestBody TimeSlotRequestDto request) {

        return timeSlotService.createTimeSlot(request);
    }

    @GetMapping("/available")
    public List<TimeSlotResponseDto> getAvailableSlots(
            @RequestParam Long doctorId,
            @RequestParam LocalDate date) {

        return timeSlotService.getAvailableSlots(
                doctorId,
                date);
    }

    @GetMapping("/{id}")
    public TimeSlotResponseDto getSlotById( @PathVariable Long id)
    { return timeSlotService.getSlotById(id); }
}
