//* Package imports */
import { useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

//* Component imports */
import ExpenseCard from "@/components/ExpenseCard";
import InfiniteScrollSentinel from "@/components/common/InfiniteScroll";

//* Utils imports */
import { COLUMNS } from "@/utils/constants";
import { updateStatus } from "@/store/slices/expenseSlice";

const PAGE_SIZE = 5;

const Home = () => {
  const { expenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

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

  return (
    <div className="space-y-8">
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => {
            const columnExpenses = expenses.filter((e) => e.status === col.id);
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
