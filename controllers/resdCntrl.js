import asyncHandler from "express-async-handler";


import {prisma }from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  console.log("Received body:", req.body);

  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    images,
    video,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        images,
        video,
      },
    });
    console.log("Residency created:", residency);
    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with this address already exists.");
    }
    throw new Error(err.message);
  }
});

export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.residency.delete({
      where: { id},
    });

    res.send({ message: "Residency deleted successfully", deleted });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Residency not found" });
    }
    throw new Error(err.message);
  }
});


export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
