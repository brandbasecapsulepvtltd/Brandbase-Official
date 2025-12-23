"use client";

import React, { useState, useRef, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import { api } from '@/lib/api';
import MapDemo from "./ContactMap/demo";
import * as d3 from "d3";

const ContactPage = () => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Location data with complete contact information
  const locationsData = {
    "india-mumbai": {
      name: "Mumbai, India",
      contactInfo: {
        title: "Mumbai Office",
        description: "Our headquarters in the financial capital of India",
        items: [
          {
            icon: "location",
            title: "Office Address",
            content: "Nariman Point<br />Mumbai 400021, Maharashtra, India"
          },
          {
            icon: "phone",
            title: "Phone Number",
            content: "+91 22 1234 5678",
            href: "tel:+912212345678"
          },
          {
            icon: "email",
            title: "Email Address",
            content: "mumbai@company.com",
            href: "mailto:mumbai@company.com"
          },
          {
            icon: "clock",
            title: "Business Hours",
            content: "Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 2PM"
          }
        ],
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.903656674152!2d72.82151441538584!3d19.017021258721847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce6e893c0b91%3A0x51d52c39ca05d7cd!2sNariman%20Point%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
      }
    },
    "singapore": {
      name: "Singapore",
      contactInfo: {
        title: "Singapore Office",
        description: "Our regional hub in Southeast Asia",
        items: [
          {
            icon: "location",
            title: "Office Address",
            content: "Raffles Place<br />Singapore 048624"
          },
          {
            icon: "phone",
            title: "Phone Number",
            content: "+65 6123 4567",
            href: "tel:+6561234567"
          },
          {
            icon: "email",
            title: "Email Address",
            content: "singapore@company.com",
            href: "mailto:singapore@company.com"
          },
          {
            icon: "clock",
            title: "Business Hours",
            content: "Monday - Friday: 9AM - 6PM<br />Saturday: Closed"
          }
        ],
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808265641961!2d103.85127231538578!3d1.284390699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19149c0f5d1f%3A0x5a85c9b1b7c3b1!2sRaffles%20Place%2C%20Singapore!5e0!3m2!1sen!2ssg!4v1620000000000!5m2!1sen!2ssg"
      }
    },
    "india-kolkata": {
      name: "Kolkata, India",
      contactInfo: {
        title: "Kolkata Office",
        description: "Our Eastern India regional office",
        items: [
          {
            icon: "location",
            title: "Office Address",
            content: "Park Street<br />Kolkata 700016, West Bengal, India"
          },
          {
            icon: "phone",
            title: "Phone Number",
            content: "+91 33 1234 5678",
            href: "tel:+913312345678"
          },
          {
            icon: "email",
            title: "Email Address",
            content: "kolkata@company.com",
            href: "mailto:kolkata@company.com"
          },
          {
            icon: "clock",
            title: "Business Hours",
            content: "Monday - Friday: 9:30AM - 6:30PM<br />Saturday: 10AM - 4PM"
          }
        ],
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.771733547907!2d88.3493883153846!3d22.551866985178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277137ae8b5c9%3A0x2a4a8a1e0a5a5a5a!2sPark%20Street%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
      }
    }
  };

  const [selectedLocation, setSelectedLocation] = useState("india-mumbai");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    contactNumber: "",
    region: "",
    industry: "",
    category: "",
    message: "",
    consent: false,
    marketing: false,
  });

  const [loading, setLoading] = useState(false);

  // Initialize the globe in background
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set dimensions to cover the entire hero section
    const containerWidth = window.innerWidth;
    const containerHeight = 600; // Hero section height
    const radius = Math.min(containerWidth, containerHeight) / 3.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false; // Point is in a hole
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const stepSize = dotSpacing * 0.08;
      let pointsGenerated = 0;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
            pointsGenerated++;
          }
        }
      }

      return dots;
    };

    const allDots = [];
    let landFeatures;

    const render = () => {
      // Clear canvas with a semi-transparent background for overlay effect
      context.clearRect(0, 0, containerWidth, containerHeight);
      
      // Optional: Add a dark overlay for better text readability
      context.fillStyle = "rgba(255, 255, 255, 0)";
      context.fillRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background) - use a subtle color
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "rgba(0, 0, 0, 0.7)";
      context.fill();
      context.strokeStyle = "rgba(255, 255, 255, 0.3)";
      context.lineWidth = 2 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Draw graticule (very subtle)
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(255, 255, 255, 0.1)";
        context.lineWidth = 0.5 * scaleFactor;
        context.globalAlpha = 0.15;
        context.stroke();
        context.globalAlpha = 0.8;

        // Draw land outlines (subtle)
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = "rgba(255, 255, 255, 0.2)";
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Draw halftone dots (subtle orange)
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 0.8 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = "rgba(255, 132, 0, 0.4)";
            context.fill();
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = await response.json();

        // Generate dots for all land features
        let totalDots = 0;
        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true });
            totalDots++;
          });
        });

        render();
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load land map data");
        setIsLoading(false);
      }
    };

    // Set up rotation and interaction (disable interaction for background)
    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.5; // Slower for background

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate);

    // Load the world data
    loadWorldData();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = 800;
      const newRadius = Math.min(newWidth, newHeight) / 3.5;

      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      
      projection
        .scale(newRadius)
        .translate([newWidth / 2, newHeight / 2]);
        
      render();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      rotationTimer.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.consent) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number (basic validation)
    if (formData.contactNumber && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.contactNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      
      // Use the updated API function
      const response = await api.createContact(formData);

      if (response.success) {
        if (response.emailSent) {
          alert("✅ Message sent successfully! We've also sent you a confirmation email.");
        } else {
          alert("✅ Message submitted successfully! (Email notification failed, but your message is saved)");
        }
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          organization: "",
          contactNumber: "",
          region: "",
          industry: "",
          category: "",
          message: "",
          consent: false,
          marketing: false,
        });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error.message);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const heroSection = {
    subtitle: "Let's Build What's Next.",
    title: "Ready to Unlock Growth?<br /> <span>So Are We.</span>",
    description: "Whether you're refining an idea or ready to launch, our team is here to provide the strategic guidance and technical excellence you need. Let's start a conversation that transforms your challenges into your biggest successes.",
    buttonText: "Schedule a Call"
  };

  const formOptions = {
    regions: ["Asia", "Europe", "America", "Africa", "Oceania"],
    industries: [
      "Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Retail",
      "Manufacturing",
      "Other"
    ],
    categories: [
      "Web Design",
      "Web/Mobile Application",
      "Film Making",
      "Digital Marketing",
      "E-commerce Deployment",
      "SHM",
      "LMS",
      "Other"
    ]
  };

  return (
    <div className="min-h-screen text-gray-900 mt-15 bg-white relative">
      {/* Hero Section with Globe Background */}
      <section className="relative text-black py-24 text-center px-4 overflow-hidden">
        {/* Globe Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute top-10 left-0 w-full h-full z-0"
          style={{ opacity: 4 }}
        />
        
        {/* Dark overlay for better text readability 
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-transparent z-1"></div>
        */}

        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-4 text-3xl font-extrabold uppercase tracking-wide text-[#FF6600]">
            {heroSection.subtitle}
          </div>
          <h1 
            className="text-6xl font-bold mb-6 text-black"
            dangerouslySetInnerHTML={{
              __html: heroSection.title.replace(
                '<span>',
                '<span class="text-[#FF6600] font-extrabold">'
              )
            }}
          />
          <p className="text-xl mb-8 text-gray-900">
            {heroSection.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="relative overflow-hidden group px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-xl transition-all duration-300 text-white bg-transparent border-2 border-[#FF6600] hover:bg-[#FF6600] hover:text-white backdrop-blur-sm">
              <a href="/appointment" className="relative z-10 text-2xl">
                {heroSection.buttonText}
              </a>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            {/* Location Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Office Location
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent appearance-none cursor-pointer transition-all duration-200 hover:border-gray-400"
                >
                  <option value="india-mumbai">India (Mumbai) - Headquarters</option>
                  <option value="singapore">Singapore - Regional Hub</option>
                  <option value="india-kolkata">India (Kolkata) - Eastern Office</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <ContactInfo contactData={locationsData[selectedLocation]} />
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                {["firstName", "lastName"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium block mb-1">
                      {field === "firstName" ? "First Name *" : "Last Name *"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {["email", "organization"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium block mb-1">
                      {field === "email" ? "Email Address *" : "Organization *"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                      required
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                  required
                  placeholder="+91 12345 67890"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {["region", "industry"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium block mb-1">
                      {field === "region" ? "Region *" : "Industry *"}
                    </label>
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                      required
                    >
                      <option value="">Select</option>
                      {formOptions[field === "region" ? "regions" : "industries"].map((opt) => (
                        <option key={opt} value={opt.toLowerCase()}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {formOptions.categories.map((opt) => (
                    <option key={opt} value={opt.toLowerCase()}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  How can we help you? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  maxLength={1500}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors resize-vertical"
                  required
                  placeholder="Describe your project or inquiry..."
                ></textarea>
                <div className="text-xs text-right text-gray-500 mt-1">
                  {formData.message.length}/1500
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 text-[#FF6600] focus:ring-[#FF6600]"
                    required
                  />
                  <label className="text-sm text-gray-600">
                    I consent to processing of my personal data entered above for Mavenox to contact me. *
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={formData.marketing}
                    onChange={handleInputChange}
                    className="mt-1 text-[#FF6600] focus:ring-[#FF6600]"
                  />
                  <label className="text-sm text-gray-600">
                    I would like to receive details about products, services, and events from Mavenox.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <>
                    <span>Sending...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>

              <div className="text-xs text-gray-500 border-t pt-4">
                {/*
                                <p className="mb-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-green-600 font-medium">Using EmailJS:</span> Your submission will trigger an automatic confirmation email.
                </p>
                */}
                <p>
                  For more information on how your personal data is processed and how your consent can be managed, refer to our{" "}
                  <a href="#" className="text-[#FF6600] underline">
                    Privacy Notice
                  </a>.
                </p>
                <p className="mt-2 font-medium">* Mandatory fields</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <MapDemo/>
    </div>
  );
};

export default ContactPage;