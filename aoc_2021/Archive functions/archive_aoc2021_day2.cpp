#include <iostream>

using namespace std;

bool has_label(string main_string, string prefix)
{
    bool is_match = true;
    if( prefix.length() > main_string.length())
    {
        is_match = false;
    }
    else
    {    
        for(int i = 0; i < prefix.length() && is_match == true; i++)
        {
            if( main_string[i] != prefix[i])
            {
                is_match = false;
            }
        }
    }
    return is_match;
}

void load_label_array(string input_array[], int input_size, string label, int output_array[], int& output_length, int max_size)
{
    string value_string;
    int value_int = 0;
    int index = label.length() + 1;
    for( int i = 0; i < input_size; i++)
    {
        value_int = 0;
        if(has_label(input_array[i], label))
        {
            value_string = input_array[i];
            value_string = value_string.substr(index);
            for (int j = 0; j < value_string.length(); j++)
            {
                value_int = 10 * value_int + static_cast<int>(value_string[j] - '0');
            }

            output_array[output_length] = value_int;
            output_length++;
        }

    }

}

int array_sum(int array[], int size)
{
    int sum = 0;
    for(int i = 0; i < size; i++)
    {
        sum += array[i];
    }

    return sum;
}