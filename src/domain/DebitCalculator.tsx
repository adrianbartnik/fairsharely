export type Transaction = {
  creditor: string;
  debitor: string;
  amount: number;
};

export type FinalRepayment = {
  from: string;
  to: string;
  amount: number;
};

export class DebitCalculator {
  private participants: string[];
  private transactions: Transaction[];
  private graphStructure: number[][];

  constructor(participants: string[], transactions: Transaction[]) {
    console.log("Called twice");
    this.participants = participants;
    this.transactions = transactions;
    this.graphStructure = this.initialiseEmptyArrayWithZeros(participants.length);
  }

  private initialiseEmptyArrayWithZeros(n: number): number[][] {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  }

  calculate() {
    if (this.participants.length === 0 || this.transactions.length === 0) return;

    for (const transaction of this.transactions) {
      const indexCreditor = this.participants.indexOf(transaction.creditor);
      const indexDebitor = this.participants.indexOf(transaction.debitor);

      this.graphStructure[indexDebitor]![indexCreditor] += transaction.amount;
    }

    // A utility function that returns
    // index of minimum value in arr
    function getMin(participants: string[], arr: number[]) {
      let minInd = 0;
      for (let i = 1; i < participants.length; i++) if (arr[i]! < arr[minInd]!) minInd = i;
      return minInd;
    }

    // A utility function that returns
    // index of maximum value in arr
    function getMax(participants: string[], arr: number[]) {
      let maxInd = 0;
      for (let i = 1; i < participants.length; i++) if (arr[i]! > arr[maxInd]!) maxInd = i;
      return maxInd;
    }

    // A utility function to return minimum of 2 values
    function minOf2(x: number, y: number) {
      return x < y ? x : y;
    }

    // amount[p] indicates the net amount
    // to be credited/debited to/from person 'p'
    // If amount[p] is positive, then
    // i'th person will amount[i]
    // If amount[p] is negative, then
    // i'th person will give -amount[i]
    function minCashFlowRec(participants: string[], amount: number[], finalRepayment: FinalRepayment[]) {
      // Find the indexes of minimum and
      // maximum values in amount
      // amount[mxCredit] indicates the maximum amount
      // to be given (or credited) to any person .
      // And amount[mxDebit] indicates the maximum amount
      // to be taken(or debited) from any person.
      // So if there is a positive value in amount,
      // then there must be a negative value
      const mxCredit = getMax(participants, amount),
        mxDebit = getMin(participants, amount);

      // If both amounts are 0, then
      // all amounts are settled
      if (amount[mxCredit] === 0 && amount[mxDebit] === 0) return;

      // Find the minimum of two amounts
      const min = minOf2(-amount[mxDebit]!, amount[mxCredit]!);
      amount[mxCredit] -= min;
      amount[mxDebit] += min;

      // If minimum is the maximum amount to be
      console.log(participants[mxDebit] + " pays " + min + " to " + participants[mxCredit]);
      finalRepayment.push({
        from: participants[mxDebit]!,
        to: participants[mxCredit]!,
        amount: min,
      });

      // Recur for the amount array.
      // Note that it is guaranteed that
      // the recursion would terminate
      // as either amount[mxCredit]  or
      // amount[mxDebit] becomes 0
      minCashFlowRec(participants, amount, finalRepayment);
    }

    // Given a set of persons as graph
    // where graph[i][j] indicates
    // the amount that person i needs to
    // pay person j, this function
    // finds and prints the minimum
    // cash flow to settle all debts.
    function minCashFlow(participants: string[], graph: number[][], finalRepayment: FinalRepayment[]) {
      // Create an array amount,
      // initialize all value in it as 0.
      const amount = Array.from({ length: participants.length }, (_) => 0);

      // Calculate the net amount to
      // be paid to person 'p', and
      // stores it in amount[p]. The
      // value of amount[p] can be
      // calculated by subtracting
      // debts of 'p' from credits of 'p'
      for (let p = 0; p < participants.length; p++)
        for (let i = 0; i < participants.length; i++) amount[p] += graph[i]![p]! - graph[p]![i]!;

      minCashFlowRec(participants, amount, finalRepayment);
    }

    const finalRepayment: FinalRepayment[] = [];

    // Print the solution
    minCashFlow(this.participants, this.graphStructure, finalRepayment);

    return finalRepayment;

    // This code is contributed by Amit Katiyar - https://www.geeksforgeeks.org/minimize-cash-flow-among-given-set-friends-borrowed-money/
  }
}
