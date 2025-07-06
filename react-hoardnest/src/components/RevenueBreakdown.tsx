import React from "react";

interface RevenueBreakdownProps {
  orderValue: number;
}

// Constants for commission and shipping logic
const STORE_COMMISSION_RATE = 0.2; // 20%
const SERVICE_FEE = 85; // ₱85 for orders ≤ ₱624
const SERVICE_FEE_THRESHOLD = 625; // Orders ≥ ₱625 get commission only

function calculateRevenue(orderValue: number) {
  let serviceFee = 0;
  let commission = 0;
  let sellerReceives = orderValue;

  if (orderValue < SERVICE_FEE_THRESHOLD) {
    serviceFee = SERVICE_FEE;
    commission = 0;
    sellerReceives = orderValue - serviceFee;
  } else {
    serviceFee = 0;
    commission = orderValue * STORE_COMMISSION_RATE;
    sellerReceives = orderValue - commission;
  }

  return {
    orderValue,
    serviceFee,
    commission,
    sellerReceives,
  };
}

const RevenueBreakdown: React.FC<RevenueBreakdownProps> = ({ orderValue }) => {
  const { serviceFee, commission, sellerReceives } =
    calculateRevenue(orderValue);

  return (
    <div className="revenue-breakdown">
      <h4>Revenue Breakdown</h4>
      <ul>
        <li>Order Value: ₱{orderValue.toFixed(2)}</li>
        {serviceFee > 0 && (
          <li>
            Service Fee: ₱{serviceFee.toFixed(2)}{" "}
            <span>(Applied for orders ≤ ₱624)</span>
          </li>
        )}
        {commission > 0 && (
          <li>
            Store Commission (20%): ₱{commission.toFixed(2)}{" "}
            <span>(Applied for orders ≥ ₱625)</span>
          </li>
        )}
        <li>
          <strong>Seller Receives: ₱{sellerReceives.toFixed(2)}</strong>
        </li>
      </ul>
    </div>
  );
};

export default RevenueBreakdown;
export { calculateRevenue };
