import React from "react";
import { Link } from "react-router-dom";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { motion } from "framer-motion";
import "../assets/style/villaDetails.css";

export default function VillaDetails() {
  const { width } = useWindowDimensions();
  const device = deviceCheck(width);

  const villaInfo = {
    description: "Villa Mandalina is a beautiful, modern holiday home built in 2019, located in the peaceful neighborhood of Mandalina, just 2 km from the historic city center of Šibenik. This stunning property offers 170m² of living space on 180m² of land with a private heated pool and sea views, perfect for families or groups looking for a relaxing Croatian getaway.\n\nThe villa features 4 spacious bedrooms and 4 bathrooms, comfortably accommodating up to 10 guests. Three bedrooms have king-size beds with private en-suite bathrooms, while the fourth has two single beds. Each room is equipped with air conditioning and satellite TV for your comfort.",

    highlights: [
      { icon: "🏠", title: "170m²", subtitle: "Living Space" },
      { icon: "🛏️", title: "4", subtitle: "Bedrooms" },
      { icon: "🚿", title: "4", subtitle: "Bathrooms" },
      { icon: "🏊", title: "19m²", subtitle: "Heated Pool" },
      { icon: "👥", title: "10", subtitle: "Max Guests" },
      { icon: "🚗", title: "Free", subtitle: "Parking" },
    ],

    sections: [
      {
        title: "Interior",
        items: [
          {
            category: "Bedrooms",
            details: [
              "3 bedrooms with king-size beds (180×200 cm)",
              "3 private en-suite bathrooms",
              "1 bedroom with 2 single beds (100×200 cm)",
              "Satellite TV in every bedroom",
              "Air conditioning in every room",
              "Crib available upon request",
              "Sofa bed in living room (sleeps 2)",
              "Weekly linen change included",
            ],
          },
          {
            category: "Living Room",
            details: [
              "Spacious living area",
              "Satellite TV",
              "Stereo system",
              "Sofa bed for extra sleeping",
              "Air conditioning",
              "WiFi throughout the villa",
            ],
          },
          {
            category: "Kitchen",
            details: [
              "Fully equipped modern kitchen",
              "Coffee machine",
              "Oven and stove",
              "Blender",
              "Dishwasher",
              "Refrigerator and freezer",
              "Microwave",
              "Toaster",
              "Ice maker",
              "Indoor dining for 10 guests",
            ],
          },
          {
            category: "Bathrooms",
            details: [
              "4 modern bathrooms",
              "3 en-suite bathrooms",
              "Washing machine",
              "Iron and ironing board",
              "Hair dryer",
              "Towels provided",
            ],
          },
        ],
      },
      {
        title: "Exterior & Pool",
        items: [
          {
            category: "Pool Area",
            details: [
              "Private heated swimming pool (19m²)",
              "5 sun loungers",
              "Outdoor shower",
              "Pool towels provided",
              "Panoramic sea views",
            ],
          },
          {
            category: "Outdoor Space",
            details: [
              "Fully enclosed private yard (180m²)",
              "Private parking",
              "BBQ grill",
              "Outdoor kitchen",
              "Outdoor dining for 12 guests",
              "Garden furniture",
            ],
          },
        ],
      },
      {
        title: "Location & Distances",
        items: [
          {
            category: "Nearby Amenities",
            details: [
              "Restaurants: 300m",
              "Cafés: 300m",
              "Shops: 300m",
              "City center: 2km",
            ],
          },
          {
            category: "Travel Distances",
            details: [
              "Beach: 4km",
              "Split Airport: 30km",
              "Near Krka National Park",
              "Near Kornati National Park",
            ],
          },
        ],
      },
      {
        title: "Activities & Experiences",
        items: [
          {
            category: "At the Villa",
            details: [
              "Swimming in the heated pool",
              "Sunbathing with sea views",
              "BBQ evenings",
              "Relaxing in the private garden",
            ],
          },
          {
            category: "In the Area",
            details: [
              "Beach visits",
              "Exploring historic Šibenik",
              "Day trips to Krka National Park",
              "Visits to Kornati National Park",
              "Local cuisine and wine tasting",
            ],
          },
        ],
      },
    ],

    houseRules: [
      "Check-in: from 16:00",
      "Check-out: until 10:00",
      "No smoking inside the villa",
      "Pets not permitted",
      "Parties and events not permitted",
      "Family-friendly property",
    ],
  };

  return (
    <div className={`villaDetailsPage ${device}`}>
      {/* Page Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`villaDetailsIntro ${device}`}
      >
        <p className={`villaDetailsIntroText ${device}`}>
          Your Perfect Croatian Retreat in Šibenik
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`villaDetailsHighlights ${device}`}
      >
        {villaInfo.highlights.map((highlight, index) => (
          <div key={index} className={`villaDetailsHighlightItem ${device}`}>
            <span className={`villaDetailsHighlightIcon ${device}`}>
              {highlight.icon}
            </span>
            <span className={`villaDetailsHighlightTitle ${device}`}>
              {highlight.title}
            </span>
            <span className={`villaDetailsHighlightSubtitle ${device}`}>
              {highlight.subtitle}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`villaDetailsDescription ${device}`}
      >
        <h2 className={`villaDetailsSectionTitle ${device}`}>About the Villa</h2>
        <p className={`villaDetailsDescriptionText ${device}`}>
          {villaInfo.description}
        </p>
      </motion.div>

      {/* Detailed Sections */}
      {villaInfo.sections.map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.1 }}
          className={`villaDetailsSection ${device}`}
        >
          <h2 className={`villaDetailsSectionTitle ${device}`}>
            {section.title}
          </h2>
          <div className={`villaDetailsCategoriesGrid ${device}`}>
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`villaDetailsCategoryCard ${device}`}
              >
                <h3 className={`villaDetailsCategoryTitle ${device}`}>
                  {item.category}
                </h3>
                <ul className={`villaDetailsList ${device}`}>
                  {item.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className={`villaDetailsListItem ${device}`}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* House Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`villaDetailsSection villaDetailsRulesSection ${device}`}
      >
        <h2 className={`villaDetailsSectionTitle ${device}`}>House Rules</h2>
        <div className={`villaDetailsRulesGrid ${device}`}>
          {villaInfo.houseRules.map((rule, index) => (
            <div key={index} className={`villaDetailsRuleItem ${device}`}>
              <span className="villaDetailsRuleIcon">&#10003;</span>
              {rule}
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className={`villaDetailsCTA ${device}`}
      >
        <h2 className={`villaDetailsCTATitle ${device}`}>
          Ready to Book Your Stay?
        </h2>
        <p className={`villaDetailsCTAText ${device}`}>
          Check availability and make a reservation for your perfect Croatian holiday.
        </p>
        <div className={`villaDetailsCTAButtons ${device}`}>
          <Link to="/calendar" className={`villaDetailsCTAButton primary ${device}`}>
            Check Availability
          </Link>
          <Link to="/contact" className={`villaDetailsCTAButton secondary ${device}`}>
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
