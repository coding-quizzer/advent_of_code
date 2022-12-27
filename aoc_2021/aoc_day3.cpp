#include <iostream>
#include <fstream>

//using namespace std;

using std::string, std::cout, std::ifstream;

void load_data( string, string[], int&, int);

void print_array( string[], int);

int binary_to_decimal( string);
void calc_gamma_epsilon( const string[], int, int&, int&);

void copy_array( const string[], string[], int, int&);

int calc_oxygen_generator_rating( const string[], int, int);
int calc_co2_scrubber_rating( const string[], int, int);



int main()
{
    string input_file = "aoc2021_day3_input.txt";
    const int MAX_LENGTH = 1500;
    string data[MAX_LENGTH];
    int data_length = 0;
    int gamma_rate;
    int epsilon_rate;
    int rate_product;

    int oxygen_rating;
    int co2_rating;

    int life_support_rating;
    

 


    load_data( input_file, data, data_length, MAX_LENGTH);

    calc_gamma_epsilon(data, data_length, gamma_rate, epsilon_rate);

    rate_product = gamma_rate * epsilon_rate;

    oxygen_rating = calc_oxygen_generator_rating(data, data_length, MAX_LENGTH);
    co2_rating = calc_co2_scrubber_rating(data, data_length, MAX_LENGTH);

    life_support_rating = oxygen_rating * co2_rating;

    cout << "Gamma rate is " << gamma_rate << ". \n";
    cout << "Epsilon rate is " << epsilon_rate << ". \n";
    cout << "Product is " << rate_product << ". \n";

    cout << "Oxygen generator rating is " << oxygen_rating << ". \n";
    cout << "CO2 scrubber rating is " << co2_rating << ". \n";
    cout << "Life support rating is " << life_support_rating << ". \n";

    

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

    return;
}

void print_array( string array[], int size)
{
    const int MAX_ROW_SIZE = 12;
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

int binary_to_decimal( string binary)
{
    int decimal = 0;

    for(int i = 0; i < binary.length(); i++)
    {
        decimal *= 2;
        if (binary[i] == '1')
        {
            decimal += 1;
        }
        else if (binary[i] != '0')
        {
            cout << "Invalid digit. \n";
        }
    }

    return decimal;

};

void calc_gamma_epsilon(const string data[], int size, int& gamma_int, int& epsilon_int)
{
    string gamma_string;
    string epsilon_string;
    int ones;
    int zeros;

    int number_length = data[0].length();


    for ( int i = 0; i < number_length; i++)
    {
        ones = 0;
        zeros = 0;
        for (int j = 0; j < size; j++)
        {
            if (data[j][i] == '0')
            {
                zeros++;
            }
            else if( data[j][i] == '1')
            {
                ones++;
            }
            else
            {
                cout << "Invalid digit. \n";
            }
        }
        if( ones > zeros)
        {
            gamma_string += "1";
            epsilon_string += "0";
        }
        else if (zeros > ones)
        {
            gamma_string += "0";
            epsilon_string += "1";
        }
        else
        {
            cout << "There are equal ones and zeros. \n";
        }
    }

    gamma_int = binary_to_decimal(gamma_string);
    epsilon_int = binary_to_decimal(epsilon_string); 

    return;
}

void copy_array(const string input[], string output[], int start_size, int& end_size)
{
    end_size = 0;
    for ( int i = 0; i < start_size; i++)
    {
        output[i] = input[i];
        end_size++;
    }

    return;
}

int calc_oxygen_generator_rating(const string input[], int size, const int MAX_SIZE)
{
    string start[MAX_SIZE];
    string end[MAX_SIZE];
    int start_size;
    int end_size;
    int index;

    int ones;
    int zeros;

    char most_frequent;

    start_size = size;


    copy_array(input, start, size, start_size);

    index = 0;
    do 
    {
        zeros = 0;
        ones = 0;
        for(int i = 0; i < start_size; i++)
        {
            if( start[i][index] == '0')
            {

                zeros++;
            }
            else if( start[i][index] == '1')
            {
                ones++;
            }
            else
            {
                cout << "Invalid Digit \n";
            }
        }

        if( zeros > ones)
        {
            most_frequent = '0';
        }
        else 
        {
            most_frequent = '1';
        }

        end_size = 0;

        for( int i = 0; i < start_size; i++)
        {
            if (start[i][index] == most_frequent)
            {
                end[end_size] = start[i];
                end_size++;
            }
        }

        cout << "The most frequent digit is " << most_frequent << ". \n";
        print_array(end, end_size);
        cout << "\n";

        copy_array( end, start, end_size, start_size);
        index++;
    } while(end_size > 1);

    return binary_to_decimal( end[0]);


}

int calc_co2_scrubber_rating(const string input[], int size, const int MAX_SIZE)
{
    string start[MAX_SIZE];
    string end[MAX_SIZE];
    int start_size;
    int end_size;
    int index;

    int ones;
    int zeros;

    char least_frequent;

    start_size = size;
    end_size = start_size;

    copy_array(input, start, size, start_size);

    index = 0;
    
    do
    {
        zeros = 0;
        ones = 0;
        for(int i = 0; i < start_size; i++)
        {
            if( start[i][index] == '0')
            {

                zeros++;
            }
            else if( start[i][index] == '1')
            {
                ones++;
            }
            else
            {
                cout << "Invalid Digit \n";
            }
        }

        if( ones < zeros)
        {
            least_frequent = '1';
        }
        else 
        {
            least_frequent = '0';
        }

        end_size = 0;

        for( int i = 0; i < start_size; i++)
        {
            if (start[i][index] == least_frequent)
            {
                end[end_size] = start[i];
                end_size++;
            }
        }
        print_array( end, end_size);
        copy_array( end, start, end_size, start_size);
        index++;
    } while (end_size > 1);

    return binary_to_decimal( end[0]);


}