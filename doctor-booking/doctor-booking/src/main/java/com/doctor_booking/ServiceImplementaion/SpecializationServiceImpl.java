package com.doctor_booking.ServiceImplementaion;

import com.doctor_booking.Dto.SpecializationRequestDto;
import com.doctor_booking.Dto.SpecializationResponseDto;
import com.doctor_booking.Entity.Specialization;
import com.doctor_booking.Exception.ResourceNotFoundException;
import com.doctor_booking.Repository.SpecializationRepository;
import com.doctor_booking.Service.SpecializationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecializationServiceImpl implements SpecializationService {


    private final SpecializationRepository specializationRepository;

    public SpecializationServiceImpl(SpecializationRepository specializationRepository) {
        this.specializationRepository = specializationRepository;
    }


    @Override
    public SpecializationResponseDto createSpecialization(
            SpecializationRequestDto request) {

        Specialization specialization = Specialization.builder()
                .name(request.name())
                .build();

        Specialization saved =
                specializationRepository.save(specialization);

        return mapToResponse(saved);
    }

    @Override
    public List<SpecializationResponseDto> getAllSpecializations() {

        return specializationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public SpecializationResponseDto getSpecializationById(Long id) {

        Specialization specialization =
                specializationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Specialization not found with id: " + id));

        return mapToResponse(specialization);
    }

    private SpecializationResponseDto mapToResponse(
            Specialization specialization) {

        return new SpecializationResponseDto(
                specialization.getId(),
                specialization.getName()
        );
    }
}
