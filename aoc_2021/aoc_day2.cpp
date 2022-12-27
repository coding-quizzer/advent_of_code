#include <iostream>
#include <fstream>
#include <string>

using namespace std;

void print_array( int[], int);

void load_data( string, string[], int&, int);


void run_movements(const string[], int, int&, int&);

void run_aim_movements(const string[], int, int&, int&);

int main()
{
    string input_file = "aoc2021_day2_test_input.txt";
    const int MAX_LENGTH = 1500;
    string data[MAX_LENGTH];
    int data_length = 0;

    int forward_sum_a = 0;
    int vertical_sum_a = 0;
    int final_product_a;

    int forward_sum_b = 0;
    int vertical_sum_b = 0;
    int final_product_b;

    string label = "forward";



    load_data( input_file, data, data_length, MAX_LENGTH);

    run_movements( data, data_length, vertical_sum_a, forward_sum_a);
    run_aim_movements( data, data_length, vertical_sum_b, forward_sum_b);


    final_product_a = vertical_sum_a * forward_sum_a;
    final_product_b = vertical_sum_b * forward_sum_b;

    cout << "Original Test: \n";
    cout << "Vertical position: " << vertical_sum_a << "\n";
    cout << "Horizantal position: " << forward_sum_a << "\n";
    cout << "The product of distances is " << final_product_a << ". \n";

    cout << "\nModified Test: \n";
    cout << "Vertical position: " << vertical_sum_b << "\n";
    cout << "Horizantal position: " << forward_sum_b << "\n";
    cout << "The product of distances is " << final_product_b << ". \n";


    return 0;
}

void load_data( string input_name, string data[], int& size, int max_size)
{
    
    string data_string;

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


        cout << array[i] << " ";
        
    }
    
    cout << "\n";
    return;
}







void run_movements( const string array[], int size, int& vertical, int& horizantal)
{
    string command;
    int letter;
    int distance_int;

    for( int i = 0; i < size; i++)
    {
        command = "";
        distance_int = 0;
        for( letter = 0; array[i][letter] != ' '; letter++)
        {
            command += array[i][letter];
        }

        for( letter++; letter < array[i].length(); letter++)
        {
            distance_int = 10 * distance_int + static_cast<int>(array[i][letter] - '0');
        }

        if( command == "forward")
        {
            horizantal += distance_int;
        }
        else if( command == "down")
        {
            vertical += distance_int;
        }
        else if( command == "up")
        {
            vertical -= distance_int;
        }
        else
        {
            cout << "Invalid command. \n";
        }


    }
}

void run_aim_movements( const string array[], int size, int& vertical, int& horizantal)
{
    int aim = 0;
    string command;
    int letter;
    int distance_int;

    for( int i = 0; i < size; i++)
    {
        command = "";
        distance_int = 0;
        for( letter = 0; array[i][letter] != ' '; letter++)
        {
            command += array[i][letter];
        }

        for( letter++; letter < array[i].length(); letter++)
        {
            distance_int = 10 * distance_int + static_cast<int>(array[i][letter] - '0');
        }

        if( command == "forward")
        {
            horizantal += distance_int;
            vertical += aim * distance_int;

            //cout << "Aim: " << aim << "\n";
            //cout << "Horizantal: " << horizantal << "\n";
            //cout << "Vertical: " << vertical << "\n";
        }
        else if( command == "down")
        {
            aim += distance_int;
        }
        else if( command == "up")
        {
            aim -= distance_int;
    
        }
        else
        {
            cout << "Invalid command. \n";
        }


    }
}


