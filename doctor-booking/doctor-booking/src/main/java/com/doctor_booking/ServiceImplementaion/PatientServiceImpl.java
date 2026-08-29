package com.doctor_booking.ServiceImplementaion;

import com.doctor_booking.Dto.PatientRequestDto;
import com.doctor_booking.Dto.PatientResponseDto;
import com.doctor_booking.Entity.Patient;
import com.doctor_booking.Exception.ResourceNotFoundException;
import com.doctor_booking.Repository.PatientRepository;
import com.doctor_booking.Service.PatientService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    public PatientServiceImpl(
            PatientRepository patientRepository) {

        this.patientRepository = patientRepository;
    }


    @Override
    public PatientResponseDto createPatient(
            PatientRequestDto request) {

        Patient patient = Patient.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .age(request.age())
                .gender(request.gender())
                .build();

        Patient saved = patientRepository.save(patient);

        return mapToResponse(saved);
    }


    @Override
    public PatientResponseDto getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + id));

        return mapToResponse(patient);
    }


    @Override
    public PatientResponseDto getPatientByEmail(
            String email) {

        Patient patient = patientRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with email: " + email));

        return mapToResponse(patient);
    }


    @Override
    public List<PatientResponseDto> getAllPatients() {

        return patientRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public PatientResponseDto updatePatient(
            Long id,
            PatientRequestDto request) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + id));

        patient.setName(request.name());
        patient.setEmail(request.email());
        patient.setPhone(request.phone());
        patient.setAge(request.age());
        patient.setGender(request.gender());

        Patient updated =
                patientRepository.save(patient);

        return mapToResponse(updated);
    }


    @Override
    public void deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + id));

        patientRepository.delete(patient);
    }


    private PatientResponseDto mapToResponse(
            Patient patient) {

        return new PatientResponseDto(
                patient.getId(),
                patient.getName(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getAge(),
                patient.getGender()
        );
    }
}