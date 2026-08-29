package com.doctor_booking.Controller;

import com.doctor_booking.Dto.SpecializationRequestDto;
import com.doctor_booking.Dto.SpecializationResponseDto;
import com.doctor_booking.Service.SpecializationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specializations")
public class SpecializationController {

    private final SpecializationService specializationService;

    public SpecializationController(SpecializationService specializationService) {
        this.specializationService = specializationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SpecializationResponseDto create(
            @Valid @RequestBody SpecializationRequestDto request) {

        return specializationService.createSpecialization(request);
    }

    @GetMapping
    public List<SpecializationResponseDto> getAll() {

        return specializationService.getAllSpecializations();
    }

    @GetMapping("/{id}")
    public SpecializationResponseDto getById(
            @PathVariable Long id) {

        return specializationService.getSpecializationById(id);
    }
}
