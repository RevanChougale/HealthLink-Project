package com.doctor_booking.ServiceImplementaion;

import com.doctor_booking.Dto.DoctorRequestDto;
import com.doctor_booking.Dto.DoctorResponseDto;
import com.doctor_booking.Exception.ResourceNotFoundException;
import com.doctor_booking.Repository.DoctorRepository;
import com.doctor_booking.Repository.SpecializationRepository;
import com.doctor_booking.Service.DoctorService;
import org.springframework.stereotype.Service;
import com.doctor_booking.Entity.Doctor;
import com.doctor_booking.Entity.Specialization;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository, SpecializationRepository specializationRepository) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
    }


    @Override
    public DoctorResponseDto createDoctor(DoctorRequestDto request) {

        Specialization specialization =
                specializationRepository.findById(request.specializationId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Specialization not found"));

        Doctor doctor = Doctor.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .city(request.city())
                .experience(request.experience())
                .specialization(specialization)
                .build();

        Doctor savedDoctor = doctorRepository.save(doctor);

        return mapToResponse(savedDoctor);
    }

    @Override
    public DoctorResponseDto getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id));

        return mapToResponse(doctor);
    }

    @Override
    public List<DoctorResponseDto> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<DoctorResponseDto> searchDoctors(
            String city,
            String specialization) {

        List<Doctor> doctors;

        if (city != null && specialization != null) {

            doctors = doctorRepository
                    .findByCityIgnoreCaseAndSpecializationNameIgnoreCase(
                            city,
                            specialization);

        } else if (city != null) {

            doctors = doctorRepository
                    .findByCityIgnoreCase(city);

        } else if (specialization != null) {

            doctors = doctorRepository
                    .findBySpecializationNameIgnoreCase(specialization);

        } else {

            doctors = doctorRepository.findAll();
        }

        return doctors.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public DoctorResponseDto updateDoctor(
            Long id,
            DoctorRequestDto request) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id));

        Specialization specialization =
                specializationRepository.findById(request.specializationId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Specialization not found"));

        doctor.setName(request.name());
        doctor.setEmail(request.email());
        doctor.setPhone(request.phone());
        doctor.setCity(request.city());
        doctor.setExperience(request.experience());
        doctor.setSpecialization(specialization);

        Doctor updatedDoctor = doctorRepository.save(doctor);

        return mapToResponse(updatedDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id));

        doctorRepository.delete(doctor);
    }

    private DoctorResponseDto mapToResponse(Doctor doctor) {

        return new DoctorResponseDto(
                doctor.getId(),
                doctor.getName(),
                doctor.getEmail(),
                doctor.getPhone(),
                doctor.getCity(),
                doctor.getExperience(),
                doctor.getSpecialization().getName()
        );
    }

}
