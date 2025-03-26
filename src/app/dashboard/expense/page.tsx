import  ExpenseTable  from "@/components/app-expensesingleday";
import ExpenseButton from "@/components/ui/app-addExpensebutton";

const Expense = () => {
  return (
    <div>
      <div>
        <ExpenseButton />
      </div>
      <div>
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Expense;
