"use client";

import React from "react";
import { UserGroupIcon, AcademicCapIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";

interface EcommerceMetricsProps {
  stats: {
    studentCount: number;
    teacherCount: number;
    classCount: number;
    activeYear: string;
  };
}

export const EcommerceMetrics = ({ stats }: EcommerceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <UserGroupIcon className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.studentCount}
            </h4>
            <span className="text-sm font-medium">Total Santri</span>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <UserIcon className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.teacherCount}
            </h4>
            <span className="text-sm font-medium">Total Guru & Staff</span>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <AcademicCapIcon className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.activeYear}
            </h4>
            <span className="text-sm font-medium">Tahun Ajaran Aktif</span>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <BookOpenIcon className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {stats.classCount}
            </h4>
            <span className="text-sm font-medium">Total Kelas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
