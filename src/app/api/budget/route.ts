import { NextResponse } from "next/server";

import pool from "@/lib/db";

export async function GET() {
  try {

    const summaryResult = await pool.query(
      `
      SELECT * FROM trip_budget
      LIMIT 1
      `
    );

    const expenseResult = await pool.query(
      `
      SELECT
        category AS name,
        amount AS value
      FROM expense_breakdown
      `
    );

    const dailyResult = await pool.query(
      `
      SELECT
        day,
        expense
      FROM daily_expenses
      `
    );

    return NextResponse.json({
      summaryData: summaryResult.rows[0],
      expenseData: expenseResult.rows,
      dailyExpenseData: dailyResult.rows,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}