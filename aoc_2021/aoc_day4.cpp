#include <iostream>
#include <fstream>
#include <iomanip>

using namespace std;


void reset_arrays( int[], int, int[][5][5], int);
void print_array( int[], int);

string convert_integer_string( int);
void print_array( int[][5][5], int);


void print_array_marked( int[][5][5], int[][5][5], int);
void load_data( string, int[], int&, int, int[][5][5], int&, int);
void add_call_number( int, int[][5][5], int[][5][5], int);

void create_supplementary_arrays( int[][5][5], int, int[], int&);

void record_call_number( int, const int[][5][5], int[][5][5], int[], int);
bool check_boards_solved(int[][5][5], int, int&);
bool check_boards_solved_with_range(int[][5][5], int, int[],  int&, int[], int);

int calc_score( int, int[][5][5], int[][5][5], int, int);

void remove_array_element( int, int[], int&);


int main()
{
    const int MAX_BOARDS = 110;
    const int MAX_CALL_SIZE = 110;
    string file_input = "aoc2021_day4_test_input.txt";
    int call_numbers[MAX_CALL_SIZE];
    int call_length = 0;
    int bingo_boards[MAX_BOARDS][5][5];
    int bingo_length = 0;

    

    int call_index = 0;
    int call_number;

    int bingo_tracker[MAX_BOARDS][5][5];

    int remaining_ids[MAX_BOARDS];
    int remaining_ids_length;

    bool match_found = false;
    int match_board[100];
    int match_board_length = 0;

    int first_board;
    int first_score;
    int first_call_number;
    int first_match_board_length;

    int last_board;
    int last_score;
    int last_call_number;
    int last_match_board_length;

    int board_tracked = 2;

    

    reset_arrays(call_numbers, MAX_CALL_SIZE, bingo_boards, MAX_BOARDS);

    load_data( file_input, call_numbers, call_length, MAX_CALL_SIZE,  bingo_boards, bingo_length, MAX_BOARDS);

    create_supplementary_arrays(bingo_tracker, bingo_length, remaining_ids, remaining_ids_length);

    print_array(call_numbers, call_length);

    for(call_index = 0; call_index < 4; call_index++)
    {
        call_number = call_numbers[call_index];
        cout << "Call Number: " << call_number << "\n\n";
        record_call_number( call_number, bingo_boards, bingo_tracker, remaining_ids, remaining_ids_length);
        print_array_marked(bingo_boards, bingo_tracker, board_tracked);
    }

    for( call_index; call_index < call_length && match_found == false; call_index++)
    {
        call_number = call_numbers[call_index];
        record_call_number( call_number, bingo_boards, bingo_tracker, remaining_ids, remaining_ids_length);
        match_found = check_boards_solved_with_range(bingo_tracker, bingo_length, match_board, match_board_length, remaining_ids, remaining_ids_length);
        cout << "Call Number: " << call_number << "\n\n";
        print_array_marked(bingo_boards, bingo_tracker, board_tracked);
        
    }

     remove_array_element(match_board[0], remaining_ids, remaining_ids_length);

    if( match_found == false)
    {
        cout << "No match found. \n";
    }
    else
    {
        first_board = match_board[0];
        first_score = calc_score(call_number, bingo_boards, bingo_tracker, bingo_length, match_board[0]);
        first_call_number = call_number;
        first_match_board_length = match_board_length;
        match_found = false;

    }

    while( remaining_ids_length > 0)
    {
        for( call_index; call_index < call_length && match_found == false; call_index++)
        {
            call_number = call_numbers[call_index];
            record_call_number( call_number, bingo_boards, bingo_tracker, remaining_ids, remaining_ids_length);
            match_found = check_boards_solved_with_range(bingo_tracker, bingo_length, match_board, match_board_length, remaining_ids, remaining_ids_length);
            
        }
        if( match_found == false)
        {
            cout << "No match found. \n";
        }
        else
        {
            for( int index = 0; index < match_board_length; index++)
            {
                remove_array_element(match_board[index], remaining_ids, remaining_ids_length);
            }
            match_found = false;
        }
    }

    last_score = calc_score(call_number, bingo_boards, bingo_tracker, bingo_length, match_board[0]);
    last_board = match_board[0];
    last_call_number = call_number;
    last_match_board_length = match_board_length;


    for( int i = 0; i < 24; i++)
    {
        cout << "-";
    }

    cout << "\n";

    
    if( first_match_board_length == 1)
    {   cout << "First Winning Board: \n\n";
        print_array_marked(bingo_boards, bingo_tracker, first_board);
        cout << "First calling number is " << first_call_number << ". \n";
        cout << "First Board ID is " << first_board << ". \n";
        cout << "First Score is " << first_score << ". \n\n";
        
    }

    if( last_match_board_length == 1)
    {
        cout << "Last Winning Board: \n\n";
        print_array_marked(bingo_boards, bingo_tracker, last_board);
        cout << "Last calling Number is " << last_call_number << ". \n";
        cout << "Last Board ID is " << last_board << ". \n";
        cout << "Last score is " << last_score << ". \n";
       
    }




    return 0;
}

void reset_arrays(int call_array[], int max_call_size, int bingo_boards[][5][5], int max_board_size)
{
    for( int i = 0; i < max_call_size; i++)
    {
        call_array[i] = 0;
    }

    for( int i = 0; i < max_board_size; i++)
    {
        for( int j = 0; j < 5; j++)
        {
            for( int k = 0; k < 5; k++)
            {
                bingo_boards[i][j][k] = 0;
            }
        }
    }
    
}

void print_array( int array[], int size)
{
    const int MAX_ROW_SIZE = 50;
    for (int i = 0; i < size; i++)
    {
        

        if ( i >= MAX_ROW_SIZE && i % MAX_ROW_SIZE == 0)
        {
            cout << "\n";
        }


        cout << array[i] << " ";
        
    }


    
    cout << "\n\n";
    return;
}

void print_array( int array[][5][5], int board_id)
{
    for(int i = 0; i < 5; i++)
    {
        for( int j = 0; j < 5; j++)
        {
            cout << setw(2) << array[board_id][i][j] << " ";
        }
        cout << "\n";
    }
    cout << "\n";
};

string convert_integer_string( int number)
{
    string number_string = "";

    int digit;
    int digit_check;
    int max_num_digits = -1 ;
    int num_digits = 0;
    int ten_place = 1;
    int extra_places = 0;

    digit_check = number;

    if (number == 0)
    {
        num_digits = 1;
    }
    else
    {
            while( digit_check > 0)
            {
                digit_check /= 10;
                num_digits++;
            }

    }
    
    
    if (max_num_digits != -1 && num_digits < max_num_digits)
    {
        extra_places = max_num_digits - num_digits;
        for( int i = 0; i < extra_places; i++)
        {
            number_string += "0";
        }
    }

    while( num_digits > 0)
    {   
        ten_place = 1;

        for( int i = 1; i < num_digits; i++)
        {
            ten_place *= 10;
        }

        digit = number / ten_place;
        number_string += static_cast<char>( '0' + digit);
        number -= digit * ten_place;
        num_digits--;
    }

   

    return number_string;
}

void print_array_marked( int main[][5][5], int marks[][5][5], int board_id)
{
    string number;
    for(int i = 0; i < 5; i++)
    {
        for( int j = 0; j < 5; j++)
        {
    
            if (marks[board_id][i][j] == 0)
            {
                number = "(";
                number += convert_integer_string(main[board_id][i][j]);
                number += ")";
            }
            else
            {
                number = convert_integer_string(main[board_id][i][j]);
                number += " ";
            }

            cout << setw(4) << number << " ";
        }
        cout << "\n";


    }

    cout << "\n";
    return;
}


void load_data( string input_name, int calling[], int& calling_size, int max_calling_size, int bingo_board[][5][5], int& bingo_size, int max_boards_size)
{
    ifstream input;
    input.open(input_name);
    string calling_line;
    string take_digit;

    int index;

    if( !input)
    {
        cout << "Could not open input file. \n";
    }

    getline(input, calling_line);

    calling_size = 0;

    for( int i = 0; i < calling_line.size() && calling_size < max_calling_size; i++)
    {
        if (calling_size >= max_calling_size)
        {
            cout << "Call data exceeded capacity of array. \n";
        }
        else if( calling_line[i] == ',')
        {
            calling_size++;
        }
        else
        {
            calling[calling_size] = calling[calling_size] * 10 + static_cast<int>(calling_line[i] - '0');
        }
    }

    calling_size++;

    getline(input, calling_line);

    bingo_size = 0;

    while( input && bingo_size < max_boards_size)
    {
        for( int i = 0; i < 5; i++)
        {
            getline(input, calling_line);
            index = 0;
            for( int j = 0; j < calling_line.size() && index < 5; j += 3)
            {   
                if (calling_line[j] == ' ')
                {
                    take_digit = "";
                }
                else
                {
                    take_digit = calling_line[j];
                }

                take_digit += calling_line[j+1];

                for (int k = 0; k < take_digit.size(); k++)
                {
                    bingo_board[bingo_size][ i][ j / 3] = 10 * bingo_board[bingo_size][i][j / 3] + static_cast<int>( take_digit[k] - '0');
                }

                index++;

            }
           
        }

        bingo_size++;
        getline(input, calling_line);

    }



    input.close();
    return;
}



void create_supplementary_arrays(int ones[][5][5], int ones_size, int current_ids[], int& current_ids_length)
{
    for( int i = 0; i < ones_size; i++)
    {
        for( int j = 0; j < 5; j++)
        {
            for( int k = 0; k < 5; k++)
            {
                ones[i][j][k] = 1;
            }
        }
    }

    current_ids_length = ones_size;

    for( int i = 0; i < current_ids_length; i++)
    {
        current_ids[i] = i;
    }

    return;

}

void record_call_number( int call_number, const int data[][5][5], int record[][5][5], int range[], int range_size)
{
    int bingo_board;
    for( int i = 0; i < range_size ; i++)
    {
        bingo_board = range[i];
        for (int j = 0; j < 5; j++)
        {
            for (int k = 0; k < 5; k++)
            {
                if (data[bingo_board][j][k] == call_number)
                {
                    record[bingo_board][j][k]--;
                }
            }
        }
    }

    return;
}

bool check_boards_solved(int match[][5][5], int size, int& board_id)
{
    bool is_solved = false;
    int sum;
    for( int i = 0; i < size; i++)
    {
        for ( int row = 0; row < 5 && is_solved == false; row++)
        {
            sum = 0;
            if( match[i][row][0] == 0)
            {
                for ( int column = 1; column < 5 && sum == 0; column++)
                {
                    sum += match[i][row][column];
                }

                if( sum == 0)
                {
                    is_solved = true;
                    board_id = i;
                }
            }
        }

        for ( int column = 0; column < 5 && is_solved == false; column++)
        {
            sum = 0;
            if( match[i][0][column] == 0)
            {
                for ( int row = 1; row < 5 && sum == 0; row++)
                {
                    sum += match[i][row][column];
                }

                if( sum == 0)
                {
                    is_solved = true;
                    board_id = i;

                }
            }
        }
    }
    return is_solved;
}

bool check_boards_solved_with_range(int match[][5][5], int size, int board_id[], int& board_id_size, int range[], int range_size)
{
    bool is_solved = false;
    bool has_solution = false;
    int sum;
    int bingo_board;

    board_id_size = 0;

    for( int i = 0; i < range_size; i++)
    {   
        bingo_board = range[i];
        for ( int row = 0; row < 5 && is_solved == false; row++)
        {
            sum = 0;
            if( match[bingo_board][row][0] == 0)
            {
                for ( int column = 0; column < 5 && sum == 0; column++)
                {
                    sum += match[bingo_board][row][column];
                }

                if( sum == 0)
                {
                    has_solution = true;
                    is_solved = true;
                    board_id[board_id_size] = bingo_board;
                    board_id_size++;
                }
            }
        }

        for ( int column = 0; column < 5 && is_solved == false; column++)
        {
            sum = 0;
            if( match[bingo_board][0][column] == 0)
            {
                for ( int row = 0; row < 5 && sum == 0; row++)
                {
                    sum += match[bingo_board][row][column];
                }

                if( sum == 0)
                {
                    has_solution = true;
                    is_solved = true;
                    board_id[board_id_size] = bingo_board;
                    board_id_size++;
                }
            }
        }

        is_solved = false;
    }
    return has_solution;
}

int calc_score(int calling_number, int data_board[][5][5], int checking_board[][5][5], int size, int board_id)
{
    int score = 0;
    
    for ( int j = 0; j < 5; j++)
    {
        for( int k = 0; k < 5; k++)
        {
            score += data_board[board_id][j][k] * checking_board[board_id][j][k];
        }
    }

    score *= calling_number;

    return score;
}

void remove_array_element(int element, int array[], int& size)
{
    int index = -1;
    for( int i = 0; i < size; i++)
    {
        if(array[i] == element)
        {
            index = i;
        }

    }

    if( index == -1)
    {
        cout << "Element not found. \n";
    }
    else
    {
        for ( int i = index + 1; i < size; i++)
        {
            array[i - 1] = array[i];
        }
        size--;
    }

    return;
}