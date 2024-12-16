import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat } from "@fortawesome/free-solid-svg-icons";

const AnimalCategoryDropdown = ({ onSelect }) => {
  const [isAnimalDropDownOpen, setIsAnimalDropDownOpen] = useState(false);
  const [selected, setSelected] = useState({ label: "선택", icon: null });
  const dropdownRef = useRef(null); // 드롭다운 영역 참조

  const options = [
    { value: "개", label: "개", icon: faDog },
    { value: "고양이", label: "고양이", icon: faCat },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsAnimalDropDownOpen(false);
    onSelect(option.value);
  };

  // 바깥 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAnimalDropDownOpen(false); // 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // 이벤트 리스너 추가
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // 이벤트 리스너 제거
    };
  }, []);

  return (
    <div
      ref={dropdownRef} // 드롭다운 영역 참조 설정
      style={{ position: "relative", width: "200px" }}
    >
      <label>동물 카테고리</label>
      <div
        onClick={() => setIsAnimalDropDownOpen((prev) => !prev)}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {selected.icon && (
            <FontAwesomeIcon
              icon={selected.icon}
              style={{ marginRight: "8px" }}
            />
          )}
          {selected.label}
        </div>
        <span style={{ fontSize: "12px" }}>▼</span>
      </div>

      {isAnimalDropDownOpen && (
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
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={option.icon}
                style={{ marginRight: "8px" }}
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalCategoryDropdown;
