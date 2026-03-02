//* Package imports */
import { useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

//* Component imports */
import HomeHeader from "@/components/HomeHeader";
import ExpenseCard from "@/components/ExpenseCard";
import InfiniteScrollSentinel from "@/components/common/InfiniteScroll";

//* Utils imports */
import { COLUMNS } from "@/utils/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { updateStatus } from "@/store/slices/expenseSlice";

const PAGE_SIZE = 5;

const Home = () => {
  const { expenses, filterCategory, searchTerm } = useSelector(
    (state) => state.expenses,
  );
  const dispatch = useDispatch();

  const debouncedSearch = useDebounce(searchTerm, 300);

  const [limits, setLimits] = useState({
    Pending: PAGE_SIZE,
    Approved: PAGE_SIZE,
    Correction: PAGE_SIZE,
  });

  const totalAmount = expenses
    .filter((e) => e.status === "Approved")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const handleLoadMore = (status, totalItems) => {
    setLimits((prev) => {
      if (prev[status] < totalItems) {
        return { ...prev, [status]: prev[status] + PAGE_SIZE };
      }
      return prev;
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dispatch(
      updateStatus({
        id: Number(draggableId),
        status: destination.droppableId,
      }),
    );

    toast.success(`Moved to ${destination.droppableId}`);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      filterCategory === "All" || expense.category === filterCategory;

    // Search Filter (Title or ID)
    const searchLower = debouncedSearch?.toLowerCase();
    const searchMatch =
      expense.title.toLowerCase().includes(searchLower) ||
      expense.id.toString().includes(searchLower);

    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-8">
      <HomeHeader totalAmount={totalAmount} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => {
            const columnExpenses = filteredExpenses.filter(
              (e) => e.status === col.id,
            );
            const visibleExpenses = columnExpenses.slice(0, limits[col.id]);
            const hasMoreData = limits[col.id] < columnExpenses.length;

            return (
              <div
                key={col.id}
                className="bg-[#F7F2F6] rounded-[2.5rem] p-6 flex flex-col shadow-inner min-h-125 h-[65vh]"
              >
                <div className="flex items-center justify-between mb-6 px-2">
                  <h3 className="font-bold text-gray-800 text-xl">
                    {col.title}
                  </h3>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm">
                    {visibleExpenses.length} / {columnExpenses.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto px-2 custom-scrollbar pb-10 bg-[#F7F2F6]/50 rounded-[2.5rem] pt-4">
                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={clsx(
                          "flex-1 space-y-4",
                          snapshot.isDraggingOver ? "bg-purple-50" : "",
                        )}
                      >
                        {visibleExpenses.map((expense, index) => (
                          <Draggable
                            key={expense.id}
                            draggableId={expense.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <ExpenseCard
                                  expense={expense}
                                  snapshot={snapshot}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}

                        <InfiniteScrollSentinel
                          hasMore={hasMoreData}
                          onIntersect={() =>
                            handleLoadMore(col.id, columnExpenses.length)
                          }
                        />
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
