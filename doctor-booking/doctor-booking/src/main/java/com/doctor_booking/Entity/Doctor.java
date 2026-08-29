package com.doctor_booking.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String city;

    private String experience;

    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;
}