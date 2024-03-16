import React from "react";
import './Filters.css'

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
  {
    name: "Collectibles",
    value: "collectibles",
  },
  {
    name: "Art & Antiques",
    value: "art_antiques",
  },
  {
    name: "Toys & Games",
    value: "toys_games",
  },
  {
    name: "Jewelry & Watches",
    value: "jewelry_watches",
  },
  {
    name: "Automotive",
    value: "automotive",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-9 years old",
    value: "6-8",
  },
  {
    name: "9-14 years old",
    value: "9-12",
  },
  {
    name: "14+ years old",
    value: "12-20",
  },
  {
    name: "Very old",
    value: "30-500",
  },
];
function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-72 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-orange-900  text-xl">Filters</h1>
        <i
          className="ri-close-line  text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600">Categories</h1>

        <div className="flex flex-col">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div><br/>
          <hr/>
        <h1 className="text-gray-600 mt-5">Ages</h1>
        <div className="flex flex-col">
          {ages.map((age) => {
            return (
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="age"
                  className="max-width"
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor="age">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
