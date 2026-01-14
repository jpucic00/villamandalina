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
    description: "Villa Mandalina is a beautiful, modern holiday home located in the peaceful neighborhood of Mandalina, just 2 km from the historic city center of Šibenik. This stunning property offers 170m² of living space with a private heated pool, perfect for families or groups looking for a relaxing Croatian getaway.\n\nThe villa features 4 spacious bedrooms and 4 bathrooms, comfortably accommodating up to 10 guests. Each room is equipped with air conditioning and a television for your comfort. The interior is tastefully decorated with modern furnishings while maintaining a warm, welcoming atmosphere.",

    highlights: [
      { icon: "🏠", title: "170m2", subtitle: "Living Space" },
      { icon: "🛏️", title: "4", subtitle: "Bedrooms" },
      { icon: "🚿", title: "4", subtitle: "Bathrooms" },
      { icon: "🏊", title: "19m2", subtitle: "Heated Pool" },
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
              "Three bedrooms with king size beds",
              "One bedroom with two single beds",
              "Television in every room",
              "Air conditioning in every room",
              "Cradle and extra bed available on request",
              "Quality bed linen provided",
              "Mosquito nets on windows",
            ],
          },
          {
            category: "Living Room",
            details: [
              "Spacious living area",
              "Television with satellite channels",
              "Extendable couch for extra sleeping",
              "Air conditioning",
              "Coffee table",
              "Comfortable seating",
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
              "Inside and outside dining area",
            ],
          },
          {
            category: "Bathrooms",
            details: [
              "Shower or walk-in shower",
              "Hair dryer",
              "Washing machine",
              "Towels provided",
              "Toilet paper provided",
              "Modern fixtures",
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
              "Private heated swimming pool (19m2)",
              "Sun loungers and sunbathing equipment",
              "Outside shower",
              "Pool towels provided",
              "Relaxing poolside atmosphere",
            ],
          },
          {
            category: "Outdoor Space",
            details: [
              "Fully fenced private yard",
              "Private parking space",
              "Firewood barbecue grill",
              "Outdoor dining area",
              "Garden furniture",
              "Beautiful landscaping",
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
              "Shop: 300m",
              "Restaurant: 300m",
              "Cafe: 300m",
              "Pharmacy: 1km",
              "City center: 2km",
              "Hospital: 2km",
            ],
          },
          {
            category: "Travel Distances",
            details: [
              "Beach: 4km",
              "Airport (Split): 30km",
              "Krka National Park: 15km",
              "Kornati Islands: boat trip available",
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
              "Swimming in the private pool",
              "Sunbathing",
              "Barbecue evenings",
              "Relaxing in the garden",
            ],
          },
          {
            category: "In the Area",
            details: [
              "Beach visits",
              "Hiking trails",
              "Bike riding",
              "Fishing trips",
              "Sightseeing in Šibenik",
              "Day trips to Krka National Park",
              "Island hopping to Kornati",
              "Wine tasting",
              "Local cuisine exploration",
            ],
          },
        ],
      },
    ],

    houseRules: [
      "Check-in: from 16:00",
      "Check-out: until 10:00",
      "No smoking inside the villa",
      "Pets allowed upon request",
      "Parties and events not permitted",
      "Quiet hours: 22:00 - 08:00",
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
