package com.doctor_booking.Controller;

import com.doctor_booking.Dto.PatientRequestDto;
import com.doctor_booking.Dto.PatientResponseDto;
import com.doctor_booking.Service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponseDto createPatient(
            @Valid @RequestBody PatientRequestDto request) {

        return patientService.createPatient(request);
    }

    @GetMapping
    public List<PatientResponseDto> getAllPatients() {

        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public PatientResponseDto getPatientById(
            @PathVariable Long id) {

        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public PatientResponseDto updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDto request) {

        return patientService.updatePatient(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePatient(@PathVariable Long id) {

        patientService.deletePatient(id);
    }

    @GetMapping("/email/{email}")
    public PatientResponseDto getPatientByEmail(
            @PathVariable String email) {

        return patientService.getPatientByEmail(email);
    }
}
