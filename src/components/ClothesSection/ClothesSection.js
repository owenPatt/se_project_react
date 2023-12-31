import React from "react";
import ItemsList from "../ItemsList/ItemsList";
import getTempCategory from "../../utils/getTemperatureCategory";
import "./ClothesSection.css";

const ClothesSection = ({
  temp,
  onSetActiveImage,
  clothingItems,
  onHandleModal,
}) => {
  const tempCategory = getTempCategory(temp);
  return (
    <div className="clothessection__cards">
      <div className="clothessection__cards-header">
        <p className="clothessection__cards-text">Your Items</p>
        <p
          className="clothessection__add-garment"
          onClick={() => {
            onHandleModal("add-garment");
          }}>
          + Add clothes
        </p>
      </div>
      <div className="clothessection__cards-container">
        <ItemsList
          tempCategory={tempCategory}
          onSetActiveImage={onSetActiveImage}
          items={clothingItems}
          showLikeButton={false}
          showAllItems={false}
        />
      </div>
    </div>
  );
};

export default ClothesSection;
