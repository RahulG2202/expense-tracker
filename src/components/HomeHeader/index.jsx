import { useDispatch, useSelector } from "react-redux";
import FormSelect from "@/components/common/FormSelect";
import { CATEGORIES } from "@/utils/constants";
import { setSearchTerm, setFilterCategory } from "@/store/slices/expenseSlice";

const HomeHeader = ({ totalAmount }) => {
  const dispatch = useDispatch();
  const { searchTerm, filterCategory } = useSelector((state) => state.expenses);

  return (
    <div className="space-y-8 mb-12">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Hello, Developer
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Track and manage your partnership funding requests.
          </p>
        </div>

        <div className="bg-[#4A1D46] text-white p-8 rounded-4xl shadow-2xl min-w-70 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-sm opacity-80 font-medium">
              Approved Total
            </span>
            <h2 className="text-4xl font-bold mt-1">
              ₹ {totalAmount.toLocaleString()}
            </h2>
          </div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-6 rounded-4xl shadow-sm border border-purple-50">
        <div className="flex-1 w-full space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-1">
            Search Requests
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Title or ID (e.g. 101)..."
              className="w-full bg-[#F7F2F6] py-3 px-12 rounded-2xl outline-none focus:ring-2 focus:ring-[#4A1D46]/20 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-64">
          <FormSelect
            label="Filter by Category"
            options={CATEGORIES}
            value={filterCategory}
            onChange={(e) => dispatch(setFilterCategory(e.target.value))}
            defaultValue="All"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
