import React from "react";

export default function MenuRow2({ name, price }) {
  return (
    <div>
      <strong>{name}</strong> — {price}원
      <br />
      <small>가장 많이 팔립니다.........</small>
    </div>
  );
}
