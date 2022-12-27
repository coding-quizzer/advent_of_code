#include <iostream>
#include <fstream>
#include <iomanip>

using namespace std;


void print_array( int[], int);

void load_data( string, int[], int&, int);

int single_comparison( int[], int, int);

int main()
{
    string input_file = "aoc2021_day1_input.txt";
    const int MAX_LENGTH = 2500;
    int num_data[MAX_LENGTH];
    int data_length = 0;
    
    int increase;
    int triple_data_length;
    int increase_triple;

    load_data(input_file, num_data, data_length, MAX_LENGTH);

    int triple_num_data[MAX_LENGTH];
    triple_data_length = data_length - 2;

    for( int i = 0; i < triple_data_length; i++)
    {
        triple_num_data[i] = num_data[i] + num_data[i+1] + num_data[i+2];
    }


    increase = single_comparison(num_data, data_length, MAX_LENGTH);
    increase_triple = single_comparison(triple_num_data, triple_data_length, MAX_LENGTH);

    cout << "There are " << increase << " increases in the simple list. \n";
    cout << "There are " << increase_triple << " increases in the triple list. \n";

    return 0;

}

void load_data( string input_name, int num_data[], int& size, int max_size)
{
    string data[max_size];
    
    string data_string;
    int data_int;

    ifstream input;

    input.open(input_name);

    if ( !input )
    {
        cout << "Could not open input\n";
    }

    while(input && size < max_size)
    {
        getline(input, data[size]);
        size++;

        if ( size >= max_size)
        {
            cout << "Array is at max capacity. Cannot load more values.\n";
        }
    }

    size--;

    for (int i = 0; i < size; i++)
    {
        data_string = data[i];
        data_int = 0;
        for (int j = 0; j < data_string.length(); j++)
        {
            data_int = 10 * data_int + static_cast<int> (data_string[j] - '0');
        }

        num_data[i] = data_int;

    }

    input.close();

   
}

void print_array( int array[], int size)
{
    const int MAX_ROW_SIZE = 20;
    for (int i = 0; i < size; i++)
    {
        

        if ( i >= MAX_ROW_SIZE && i % MAX_ROW_SIZE == 0)
        {
            cout << "\n";
        }


        cout << setw(2) << array[i] << " ";
        
    }
    
    cout << "\n";
    return;
}

int single_comparison(int num_data[], int data_length, int max_size)
{
    int differences[max_size];
    int increase = 0;
    differences[0] = 0;
    for (int i = 1; i < data_length; i++)
    {
        if ((num_data[i] - num_data[i-1]) > 0)
        {
            differences[i] = 1;
            increase ++;
        }
        else if (( num_data[i] - num_data[i-1]) == 0)
        {
            differences[i] = 0;
        }
        else
        {
            differences[i] = -1;
        }
    }

    print_array(differences, data_length);
    cout << "\n";

    return increase;
}
