//* Package imports */
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

//* Utils imports */
import { COLUMNS } from "@/utils/constants";
import { updateStatus, deleteExpense } from "@/store/slices/expenseSlice";

const Home = () => {
  const { expenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const totalAmount = expenses
    .filter((e) => e.status === "Approved")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Update the status in Redux
    dispatch(
      updateStatus({
        id: Number(draggableId),
        status: destination.droppableId,
      }),
    );

    toast.success(`Moved to ${destination.droppableId}`);
  };

  return (
    <div className="space-y-8 pb-10">
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

      {/* Expense Drag & Drop Section */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className="bg-[#F7F2F6] rounded-[2.5rem] p-6 min-h-125 flex flex-col shadow-inner"
            >
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="font-bold text-gray-800 text-xl">{col.title}</h3>
                <span
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    col.color,
                  )}
                >
                  {expenses.filter((e) => e.status === col.id).length}
                </span>
              </div>

              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={clsx(
                      "flex-1 space-y-4 transition-colors duration-200 rounded-2xl",
                      snapshot.isDraggingOver ? "bg-white/40" : "",
                    )}
                  >
                    {expenses
                      .filter((e) => e.status === col.id)
                      .map((expense, index) => (
                        <Draggable
                          key={expense.id}
                          draggableId={expense.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={clsx(
                                "bg-white p-5 rounded-2xl shadow-sm border border-transparent hover:border-purple-200 transition-all group",
                                snapshot.isDragging
                                  ? "shadow-2xl ring-2 ring-[#4A1D46]/20"
                                  : "",
                              )}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-gray-900 group-hover:text-[#4A1D46] transition-colors uppercase text-sm tracking-wider">
                                    {expense.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {expense.category}
                                  </p>
                                </div>
                                <span className="font-bold text-lg">
                                  ₹{expense.amount}
                                </span>
                              </div>

                              <div className="mt-4 flex justify-between items-center">
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                  {new Date(
                                    expense.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                                <button
                                  onClick={() =>
                                    dispatch(deleteExpense(expense.id))
                                  }
                                  className="bg-[#FF9F8E] p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
