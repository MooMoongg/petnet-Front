import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard, // 카드결제 아이콘
  faMobile, // 간편결제 아이콘
  faMoneyBill1, // 현금 아이콘
} from "@fortawesome/free-solid-svg-icons";

const PaymentCategoryDropdown = ({ onSelect, selectedValue }) => {
  const [isPaymentDropDownOpen, setIsPaymentDropDownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const dropdownRef = useRef(null);

  const options = [
    {
      value: "카드결제",
      label: "카드결제",
      icon: <FontAwesomeIcon icon={faCreditCard} />,
    },
    {
      value: "간편결제",
      label: "간편결제",
      icon: <FontAwesomeIcon icon={faMobile} />,
    },
    {
      value: "현금",
      label: "현금",
      icon: <FontAwesomeIcon icon={faMoneyBill1} />,
    },
  ];

  // 초기값에 맞는 옵션 찾기
  const findInitialOption = () =>
    options.find((option) => option.value === selectedValue) || {
      label: "카테고리를 선택하세요",
      icon: null,
    };

  const [selected, setSelected] = useState(findInitialOption());

  // 초기값 변경 시 상태 업데이트
  useEffect(() => {
    setSelected(findInitialOption());
  }, [selectedValue]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsPaymentDropDownOpen(false);
    onSelect(option.value);
  };

  // 바깥 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPaymentDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      <label>결제 수단</label>
      <div
        onClick={() => setIsPaymentDropDownOpen((prev) => !prev)}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {selected.icon && (
            <span style={{ marginRight: "8px" }}>{selected.icon}</span>
          )}
          {selected.label}
        </div>
        <span>▼</span>
      </div>

      {isPaymentDropDownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 10,
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{
                padding: "8px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: "8px" }}>{option.icon}</span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentCategoryDropdown;
