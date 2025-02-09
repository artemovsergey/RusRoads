﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RusRoads.API.Data;

#nullable disable

namespace RusRoads.API.Migrations
{
    [DbContext(typeof(RusRoadsContext))]
    [Migration("20250209182455_RemoveEntityPositionReplaceInAtribute")]
    partial class RemoveEntityPositionReplaceInAtribute
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("RusRoads.API.Entities.Applicant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Direction")
                        .HasColumnType("text");

                    b.Property<int?>("EventId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("ReceiptDateResume")
                        .HasColumnType("timestamp with time zone");

                    b.Property<byte[]>("ResumeFile")
                        .HasColumnType("bytea");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("Applicants");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Cabinet")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Fio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("HeadId")
                        .HasColumnType("integer");

                    b.Property<int?>("HelperId")
                        .HasColumnType("integer");

                    b.Property<string>("JobPhone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("ManagedId")
                        .HasColumnType("integer");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SubdivisionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("HeadId");

                    b.HasIndex("HelperId");

                    b.HasIndex("ManagedId");

                    b.HasIndex("SubdivisionId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BeginDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("EventTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ResponsiblesPerson")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("EventTypeId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("RusRoads.API.Entities.EventMaterial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("EventId")
                        .HasColumnType("integer");

                    b.Property<int>("MaterialId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.HasIndex("MaterialId");

                    b.ToTable("EventMaterials");
                });

            modelBuilder.Entity("RusRoads.API.Entities.EventType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("EventTypes");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Material", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ApprovalDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Area")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("AutorId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("ModifireDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AutorId");

                    b.ToTable("Materials");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Subdivision", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("HeadSubdivisionId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("HeadSubdivisionId");

                    b.ToTable("Subdivisions");
                });

            modelBuilder.Entity("RusRoads.API.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("Login")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RusRoads.API.Entities.WorkingCalendar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ExceptionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsWorkingDay")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("WorkingCalendars");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Applicant", b =>
                {
                    b.HasOne("RusRoads.API.Entities.Event", "Event")
                        .WithMany("Applicants")
                        .HasForeignKey("EventId");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Employee", b =>
                {
                    b.HasOne("RusRoads.API.Entities.Employee", "Head")
                        .WithMany()
                        .HasForeignKey("HeadId");

                    b.HasOne("RusRoads.API.Entities.Employee", "Helper")
                        .WithMany()
                        .HasForeignKey("HelperId");

                    b.HasOne("RusRoads.API.Entities.Subdivision", "ManagedSubdivision")
                        .WithMany()
                        .HasForeignKey("ManagedId");

                    b.HasOne("RusRoads.API.Entities.Subdivision", "Subdivision")
                        .WithMany()
                        .HasForeignKey("SubdivisionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Head");

                    b.Navigation("Helper");

                    b.Navigation("ManagedSubdivision");

                    b.Navigation("Subdivision");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Event", b =>
                {
                    b.HasOne("RusRoads.API.Entities.EventType", "EventType")
                        .WithMany("Events")
                        .HasForeignKey("EventTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EventType");
                });

            modelBuilder.Entity("RusRoads.API.Entities.EventMaterial", b =>
                {
                    b.HasOne("RusRoads.API.Entities.Event", "Event")
                        .WithMany("EventMaterials")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RusRoads.API.Entities.Material", "Material")
                        .WithMany("EventMaterials")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Material");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Material", b =>
                {
                    b.HasOne("RusRoads.API.Entities.Employee", "Autor")
                        .WithMany()
                        .HasForeignKey("AutorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Autor");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Subdivision", b =>
                {
                    b.HasOne("RusRoads.API.Entities.Subdivision", "HeadSubdivision")
                        .WithMany()
                        .HasForeignKey("HeadSubdivisionId");

                    b.Navigation("HeadSubdivision");
                });

            modelBuilder.Entity("RusRoads.API.Entities.User", b =>
                {
                    b.HasOne("RusRoads.API.Entities.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Event", b =>
                {
                    b.Navigation("Applicants");

                    b.Navigation("EventMaterials");
                });

            modelBuilder.Entity("RusRoads.API.Entities.EventType", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("RusRoads.API.Entities.Material", b =>
                {
                    b.Navigation("EventMaterials");
                });
#pragma warning restore 612, 618
        }
    }
}
