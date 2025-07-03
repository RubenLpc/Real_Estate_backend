import asyncHandler from "express-async-handler";


import {prisma }from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  console.log("Received body:", req.body);

  const {
    title,
    propertyType,
    status,
    description,
    shortDescription,
    address,
    region,
    livingArea,
    usableArea,
    hallArea,
    officeArea,
    landArea,
    pavedArea,
    rooms,
    constructionYear,
    renovationNeed,
    zoning,
    energyCertificate,
    price,
    negotiable,
    commission,
    availabilityDate,
    mainImage,
    galleryImages,
    videoUrl,
    droneVideoUrl,
    documents,
    features,
    tags,
  } = req.body;

  

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        propertyType,
        status,
        description,
        shortDescription,
        address,
        region,
        livingArea,
        usableArea,
        hallArea,
        officeArea,
        landArea,
        pavedArea,
        rooms,
        constructionYear,
        renovationNeed,
        zoning,
        energyCertificate: energyCertificate || null,
        price,
        negotiable,
        commission,
        availabilityDate: availabilityDate ? new Date(availabilityDate) : null,
        image: mainImage,
        images: galleryImages,
        video: videoUrl,
        droneVideo: droneVideoUrl,
        documents,
        features,
        tags,
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

export const updateResidency = asyncHandler(async (req, res) => {
  const residencyId = req.params.id;
 

  const {
    title,
    propertyType,
    status,
    description,
    shortDescription,
    address,
    region,
    livingArea,
    usableArea,
    hallArea,
    officeArea,
    landArea,
    pavedArea,
    rooms,
    constructionYear,
    renovationNeed,
    zoning,
    energyCertificate,
    price,
    negotiable,
    commission,
    availabilityDate,
    mainImage,
    galleryImages,
    videoUrl,
    droneVideoUrl,
    documents,
    features,
    tags,
  } = req.body;

  try {
    const updated = await prisma.residency.update({
      where: { id: residencyId },
      data: {
        title,
        propertyType,
        status,
        description,
        shortDescription,
        address,
        region,
        livingArea,
        usableArea,
        hallArea,
        officeArea,
        landArea,
        pavedArea,
        rooms,
        constructionYear,
        renovationNeed,
        zoning,
        energyCertificate: energyCertificate || null,
        price,
        negotiable,
        commission,
        availabilityDate: availabilityDate ? new Date(availabilityDate) : null,
        image: mainImage,
        images: galleryImages,
        video: videoUrl,
        droneVideo: droneVideoUrl,
        documents,
        features,
        tags,
      },
    });

    res.json({ message: "Residency updated successfully", residency: updated });
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404);
      throw new Error("Residency not found");
    }
    throw new Error(err.message);
  }
});


export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.residency.delete({
      where: { id },
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
export const getAvailableResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    where: {
      status: {
        not: "reserviert",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});


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
