import React from "react";

export default function AdvancedFilters({
  filters,
  setFilters,
}) {

  return (
    <div className="filters">

      <input
        type="text"
        placeholder="Search..."
        value={
          filters.search
        }
        onChange={(e) =>
          setFilters({
            ...filters,

            search:
              e.target.value,
          })
        }
      />

      <select
        value={
          filters.priority
        }
        onChange={(e) =>
          setFilters({
            ...filters,

            priority:
              e.target.value,
          })
        }
      >
        <option value="">
          All Priorities
        </option>

        <option value="low">
          Low
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="high">
          High
        </option>
      </select>

      <select
        value={
          filters.status
        }
        onChange={(e) =>
          setFilters({
            ...filters,

            status:
              e.target.value,
          })
        }
      >
        <option value="">
          All Status
        </option>

        <option value="todo">
          Todo
        </option>

        <option value="in-progress">
          In Progress
        </option>

        <option value="completed">
          Completed
        </option>
      </select>

    </div>
  );
}