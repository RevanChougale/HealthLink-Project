package com.doctor_booking.Controller;

import com.doctor_booking.Dto.DoctorRequestDto;
import com.doctor_booking.Dto.DoctorResponseDto;
import com.doctor_booking.Service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoctorResponseDto createDoctor(
            @Valid @RequestBody DoctorRequestDto request) {

        return doctorService.createDoctor(request);
    }

    @GetMapping
    public List<DoctorResponseDto> getAllDoctors() {

        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public DoctorResponseDto getDoctorById(
            @PathVariable Long id) {

        return doctorService.getDoctorById(id);
    }

    @GetMapping("/search")
    public List<DoctorResponseDto> searchDoctors(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String specialization) {

        return doctorService.searchDoctors(city, specialization);
    }

    @PutMapping("/{id}")
    public DoctorResponseDto updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequestDto request) {

        return doctorService.updateDoctor(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDoctor(@PathVariable Long id) {

        doctorService.deleteDoctor(id);
    }
}
