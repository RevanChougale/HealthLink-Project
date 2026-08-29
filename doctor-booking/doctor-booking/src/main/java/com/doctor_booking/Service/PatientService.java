package com.doctor_booking.Service;

import com.doctor_booking.Dto.PatientRequestDto;
import com.doctor_booking.Dto.PatientResponseDto;
import com.doctor_booking.Entity.Patient;

import java.util.List;
import java.util.Optional;

public interface PatientService {

    PatientResponseDto createPatient(PatientRequestDto request);

    PatientResponseDto getPatientById(Long id);

    List<PatientResponseDto> getAllPatients();

    PatientResponseDto updatePatient(
            Long id,
            PatientRequestDto request);


    void deletePatient(Long id);

    PatientResponseDto getPatientByEmail(String email);
}
