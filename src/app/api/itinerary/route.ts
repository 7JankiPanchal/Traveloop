import { NextResponse } from "next/server";

import pool from "@/lib/db";

export async function GET() {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        destination,
        duration,
        budget,
        description
      FROM itineraries
      `
    );

    return NextResponse.json(result.rows);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch itineraries",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      title,
      destination,
      duration,
      budget,
      description,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO itineraries
      (
        title,
        destination,
        duration,
        budget,
        description
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        title,
        destination,
        duration,
        budget,
        description,
      ]
    );

    return NextResponse.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to create itinerary",
      },
      {
        status: 500,
      }
    );
  }
}