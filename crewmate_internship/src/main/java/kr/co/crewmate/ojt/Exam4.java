package kr.co.crewmate.ojt;

public class Exam4 {
	

	public void Exam4() {

		

		//int n = 1;

		int result =0;

		//int end =5;

		

		for(int i =1; i<=5; i++) {

			result = factorial(i);

			System.out.println(i+"!=" + result);

		}

	

	}

 

 

	private int factorial(int n) {

		if(n<=1) {

			return n;

			

		}else {

			//return factorial(n-1)*n;
		    return n * factorial(n-1);

		}

 

	}	

}